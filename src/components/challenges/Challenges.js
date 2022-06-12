import React from "react"

import { useCollection } from "../../hooks/useCollection"
import SkeletonChallengeCard from "../skeletons/SkeletonChallengeCard"

import ChallengeCard from "./ChallengeCard"

const Challenges = () => {
  const { documents, isLoading } = useCollection("challenges", null, 6, [
    "createdAt",
    "desc",
  ])

  return (
    <main className="mt-16">
      <h2 className="text-5xl text-center text-white font-bold font-heading">
        Latest Challenges
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center mt-8">
        {!isLoading
          ? documents.map((challenge) => {
              return (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  challengelist
                  btnTitle="View Challenge"
                />
              )
            })
          : [1, 2, 3, 4, 5, 6].map((n) => <SkeletonChallengeCard key={n} />)}
      </div>
    </main>
  )
}

export default Challenges
