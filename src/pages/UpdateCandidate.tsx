import { SetStateAction, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { CandidateInfo } from "../models/ICandidate"
import { candidateUpdate, findByCandidateId } from "../services/candidateService"

function UpdateCandidate() {
  const { candidateId } = useParams()
  const [can, setCan] = useState<CandidateInfo>()

  const [nameSurname, setNameSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [candidateStatus, setCandidateStatus] = useState('')

  const [item, setItem] = useState<CandidateInfo[]>([])
  const loc = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    findByCandidateId(Number(candidateId)).then(res => {
      const itm = loc.state as CandidateInfo
      setNameSurname(itm.nameSurname)
      setPhone(itm.phone)
      setEmail(itm.email)
      setCandidateStatus(itm.candidateStatus)
    })
  }, [])

  const canStatus = [
    "SOURCED",
    "INTERVIEWING",
    "OFFER_SENT",
    "HIRED"
  ]

  const funcUpdate = (evt: React.FormEvent) => {
    evt.preventDefault()
    candidateUpdate(Number(candidateId), nameSurname, phone, email, candidateStatus).then(res => {
      if (res.status === 200) {
        toast.success("Candidate update", {
          position: toast.POSITION.TOP_CENTER
        });
        navigate('/')
      } else {
        toast.error("Candidate didn't update", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    })
  }
  return (

    <>
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h3 className="text-center">Update Candidate</h3>
            <form onSubmit={funcUpdate} method="post">
              <div>
                <label htmlFor="candidateId" className="form-label">  Name Surname</label>
                <input value={nameSurname} onChange={(evt) => setNameSurname(evt.target.value)} required type='text' placeholder='Name Surname' className='form-control mb-1' />
                <label htmlFor="candidateId" className="form-label">  Email</label>
                <input value={email} onChange={(evt) => setEmail(evt.target.value)} required type='email' placeholder='Email' className='form-control mb-1' />
                <label htmlFor="candidateId" className="form-label">  Phone</label>
                <input value={phone} onChange={(evt) => setPhone(evt.target.value)} required type='number' placeholder='Phone' className='form-control mb-1' />
                <label htmlFor="candidateId" className="form-label">  Candidate Status</label>
                <select value={candidateStatus} onChange={(evt) => setCandidateStatus(evt.target.value)} className="form-select mb-1">
                  <option selected>Select Category</option>
                  {canStatus.map((item, index) =>
                    <option key={index} value={item}>{item}</option>
                  )}</select>
              </div>
              <div>   <button className="float-end">Update</button></div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default UpdateCandidate
