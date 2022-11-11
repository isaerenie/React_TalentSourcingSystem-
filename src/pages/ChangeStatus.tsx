
import { SetStateAction, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { CandidateInfo } from "../models/ICandidate"
import { candidateChangeStatus, candidateUpdate, findByCandidateId } from "../services/candidateService"

function ChangeStatus() {

    const [nameSurname, setNameSurname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [candidateStatus, setCandidateStatus] = useState('')
     
    const loc = useLocation()
    const itmm = loc.state as CandidateInfo
    const candidateId=itmm.candidateId

    const navigate = useNavigate()
    const canStatus = [
        "SOURCED",
        "INTERVIEWING",
        "OFFER_SENT",
        "HIRED"
    ]
 
   
    useEffect(() => {
        findByCandidateId(candidateId).then(res => {
            const itm = loc.state as CandidateInfo
            setCandidateStatus(itm.candidateStatus)
            setPhone(itm.phone)
            setEmail(itm.email)
            setNameSurname(itm.nameSurname)           
        })
    }, [])

 
    const funcChangeStatus = (evt: React.FormEvent) => {
        evt.preventDefault()
        candidateChangeStatus(candidateId,candidateStatus, nameSurname, phone, email ).then(res => {
            if (res.status === 200) {
                console.log("geldi mi");
                toast.success("Candidate Status changed", {
                    position: toast.POSITION.TOP_CENTER
                });
                navigate(-1)
            } else {
                toast.error("New candidate didn't add!", {
                    position: toast.POSITION.TOP_CENTER
                });

            }
        })
    }
    return (

        <>
            <div className="cona">
                <form onSubmit={funcChangeStatus}>
                    <select value={candidateStatus} onChange={(evt) => setCandidateStatus(evt.target.value)} className="form-select mb-1">
                        <option selected>{candidateStatus}</option>
                        {canStatus.map((item, index) =>
                            <option key={index} value={item}>{item}</option>
                        )}</select>
                    <div>   <button >Update User</button></div>
                </form>
            </div>
        </>
    )
}
export default ChangeStatus
