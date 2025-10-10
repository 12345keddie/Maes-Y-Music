'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  useFirestore,
  useCollection,
  useUser,
  useMemoFirebase,
} from '@/firebase';
import {
  collection,
  doc,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useAuth } from '@/firebase/provider';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import {
  ThumbsUp,
  ThumbsDown,
  Loader2,
  PartyPopper,
  X,
} from 'lucide-react';
import { Progress } from './ui/progress';

const POLL_ID = 'kpop-demon-hunters';

export function Poll() {
  const firestore = useFirestore();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [isPollActive, setIsPollActive] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Halloween in the UK. Note that UK is on GMT (UTC+0) at this time.
    const pollEndDate = new Date('2025-10-31T23:59:59Z');
    const now = new Date();
    setIsPollActive(now < pollEndDate);
  }, []);

  const pollRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'polls', POLL_ID) : null),
    [firestore]
  );
  // Only create the votes reference if we have a user
  const votesRef = useMemoFirebase(
    () =>
      firestore && user
        ? collection(firestore, 'polls', POLL_ID, 'votes')
        : null,
    [firestore, user]
  );

  const { data: votes, isLoading: isLoadingVotes } = useCollection(votesRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  // Create the poll if it doesn't exist
  useEffect(() => {
    if (firestore) {
      const pollDoc = {
        id: POLL_ID,
        question: 'Should I add KPop Demon Hunters songs?',
        options: ['Yes', 'No'],
        createdAt: serverTimestamp(),
      };
      // this will create or update the document
      setDocumentNonBlocking(doc(firestore, 'polls', POLL_ID), pollDoc, {
        merge: true,
      });
    }
  }, [firestore]);

  const userVote = useMemo(() => {
    if (!user || !votes) return null;
    return votes.find((v) => v.voterId === user.uid)?.option;
  }, [user, votes]);

  const handleVote = async (option: string) => {
    if (!user || !firestore || !votesRef || !isPollActive) return;
    const voteRef = doc(votesRef, user.uid);
    const voteDoc = {
      pollId: POLL_ID,
      voterId: user.uid,
      option: option,
      votedAt: serverTimestamp(),
    };
    setDocumentNonBlocking(voteRef, voteDoc, { merge: true });
  };

  const voteCounts = useMemo(() => {
    const counts = { Yes: 0, No: 0 };
    if (!votes) return counts;
    for (const vote of votes) {
      if (vote.option === 'Yes') {
        counts.Yes++;
      } else if (vote.option === 'No') {
        counts.No++;
      }
    }
    return counts;
  }, [votes]);

  const totalVotes = voteCounts.Yes + voteCounts.No;
  const yesPercentage = totalVotes > 0 ? (voteCounts.Yes / totalVotes) * 100 : 0;
  const noPercentage = totalVotes > 0 ? (voteCounts.No / totalVotes) * 100 : 0;

  const isLoading = isUserLoading || (user && isLoadingVotes);

  const showResults = userVote || !isPollActive;

  if (isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm z-50">
      <Card className="bg-card/80 backdrop-blur-sm relative">
        {userVote && isPollActive && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={() => setIsDismissed(true)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close poll</span>
          </Button>
        )}
        <CardHeader>
          <CardTitle className="text-lg font-headline">
            Community Poll
          </CardTitle>
          <CardDescription>
            Should I add KPop Demon Hunters songs?
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-24">
              <Loader2 className="animate-spin text-primary" />
            </div>
          ) : showResults ? (
            <div className="space-y-3">
              {!isPollActive && (
                <div className="flex items-center text-sm text-center p-2 rounded-md bg-accent/20 text-accent-foreground justify-center gap-2">
                  <PartyPopper className="w-4 h-4" />
                  <span>The poll has ended. Thanks for voting!</span>
                </div>
              )}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Yes</span>
                  <span className="text-sm text-muted-foreground">
                    {voteCounts.Yes} vote{voteCounts.Yes !== 1 ? 's' : ''} (
                    {Math.round(yesPercentage)}%)
                  </span>
                </div>
                <Progress value={yesPercentage} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">No</span>
                  <span className="text-sm text-muted-foreground">
                    {voteCounts.No} vote{voteCounts.No !== 1 ? 's' : ''} (
                    {Math.round(noPercentage)}%)
                  </span>
                </div>
                <Progress value={noPercentage} variant="destructive" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleVote('Yes')}
                disabled={!user}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Yes
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleVote('No')}
                disabled={!user}
              >
                <ThumbsDown className="mr-2 h-4 w-4" />
                No
              </Button>
            </div>
          )}
        </CardContent>
        {userVote && isPollActive && (
          <CardFooter className="text-xs text-muted-foreground justify-center pt-4">
            <p>You voted: {userVote}</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
