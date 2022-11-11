import { SetStateAction, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { CandidateInfo } from "../models/ICandidate"
import { IInteraction, InteractionInfo } from "../models/IInteraction"
import { candidateUpdate, findByCandidateId } from "../services/candidateService"
import { interactionList, interactionUpdate } from "../services/InteractionService"

function UpdateInteraction() {
  const { interactionId } = useParams()
  const [can, setCan] = useState<CandidateInfo>()


  const [content, setContent] = useState('')
  const [candidateId, setCandidateId] = useState(0)
 // const [candidateResponded, setCandidateResponded] = useState(false)
  const [candidateResponded, setCandidateResponded] = useState(true);

  const [interactionType, setInteractionType] = useState('')
const [ date,setDate] = useState(new Date())

  const [item, setItem] = useState<IInteraction>()
  const loc = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const itm = loc.state as InteractionInfo
    setContent(itm.content)
    setCandidateId(itm.candidateId)
    setCandidateResponded(itm.candidateResponded)
    setInteractionType(itm.interactionType)

  }, [])

  const interType = [
    "PHONE",
    "EMAIL"
  ]

  const funcUpdate = (evt: React.FormEvent) => {
    evt.preventDefault()
    interactionUpdate(Number(interactionId), candidateId, content, candidateResponded, interactionType,date).then(res => {
      if (res.status === 200) {
        toast.success("Interaction Updated", {
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
      <div className="container">
     <div className="row">
      <div className="col mt-5">
        <h3 className="text-center">Update Interaction</h3>
        <form onSubmit={funcUpdate} method="post">
          <div>                     
            <label htmlFor="candidateId" className="form-label">  Content</label>    
            <input value={content} onChange={(evt) => setContent(evt.target.value)} required type='text' placeholder='Name Surname' className='form-control mb-1' />                        
            <label htmlFor="candidateId" className="form-label">  Candidate Responded</label>        
            <select value={interactionType} onChange={(evt) => setInteractionType(evt.target.value)} className="form-select mb-1">
              <option selected>Select Category</option>
              {interType.map((item, index) =>
                <option key={index} value={item}>{item}</option>
              )}</select>
                 <label htmlFor="candidateId" className="form-label">  Candidate Responded</label>       
            
            <input  checked={candidateResponded}
            onChange={() => setCandidateResponded(!candidateResponded)}className="form-check-input" value="candidateResponded"  defaultChecked={true} type="checkbox" 
            />

          </div>
          <div>   <button className="float-end">Update</button></div>
        </form>
      </div>
     </div>
      </div>
 
    </>
  )
}
export default UpdateInteraction
