import React, { useState } from "react"
import moment from "moment"
import { Helmet } from "react-helmet"
import { Link, useLocation, useParams } from "react-router-dom"

import rocketLoader from "../assets/animated_illustrations/rocketLoader.json"
import ChallengeHeader from "../components/challenges/ChallengeHeader"
import Avatar from "../components/reusable/Avatar"
import ConfettiWrapper from "../components/reusable/ConfettiWrapper"
import ConfirmationModal from "../components/reusable/ConfirmationModal"
import LottieAnimation from "../components/reusable/LottieAnimation"
import EmojiSection from "../components/solutions/EmojiSection"
import ShowWebsite from "../components/solutions/ShowWebsite"
import SolutionComments from "../components/solutions/SolutionComments"
// custom hooks
import { useAuthContext } from "../hooks/useAuthContext"
import { useDocument } from "../hooks/useDocument"

const SolutionDetail = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const { document } = useDocument("solutions", id)
  const { user } = useAuthContext()
  const [modal, setModal] = useState(false)

  if (!document)
    return (
      <div className="sm:ml-0 pr-5 py-52 row-start-2 row-end-3 col-start-1 md:col-start-2 col-end-3 place-self-center">
        <LottieAnimation animationDataFile={rocketLoader} height={100} width={100} />
      </div>
    )
  return (
    <div className="px-5 row-start-2 row-end-3 col-start-2 col-end-3 mb-4">
      <Helmet>
        <title>{`${document.title} CODINGSPACE challenge solution by ${document.author}`}</title>
      </Helmet>
      {state && <ConfettiWrapper />}
      <ChallengeHeader doc={document} button />
      {modal ? <ConfirmationModal setModal={setModal} id={document.id} /> : null}
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center mt-4">
          <Avatar photoURL={document.photoURL} className="ring-gray-700" />
          <div className="flex flex-col pl-1">
            <span className="text-navItem text-sm text-gray-300">{document.author}</span>
            <span className="text-navItem text-xs text-gray-400">
              {moment(document.createdAt.toDate()).fromNow()}
            </span>
          </div>
        </div>
        {user && user.uid === document.userID ? (
          <div>
            <Link
              to={`/solution/${document.id}/edit`}
              className="text-secondary cursor-pointer pr-3"
              aria-label={`${document.title} edit`}
              title={`Link to ${document.title} edit page`}
            >
              <i className="far fa-edit text-2xl"></i>
            </Link>
            <span
              className="text-red-700 cursor-pointer"
              onClick={() => setModal(!modal)}
            >
              <i className="far fa-trash-alt text-2xl"></i>
            </span>
          </div>
        ) : null}
      </div>
      <ShowWebsite
        url={document.liveWebsiteUrl}
        github={document.githubUrl}
        title={document.title}
      />
      <div className="grid grid-col-1 md:grid-cols-[1fr_160px] items-start gap-x-5 mt-10">
        <SolutionComments />
        <EmojiSection />
      </div>
    </div>
  )
}

export default SolutionDetail
