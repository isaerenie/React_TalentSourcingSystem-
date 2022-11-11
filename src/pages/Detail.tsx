import React, { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CandidateInfo } from '../models/ICandidate'
import { InteractionInfo } from '../models/IInteraction'
import { candidateList, candidateSave } from '../services/candidateService'
import { getCanInterList, interactionChangeStatus, interactionDelete, interactionList, interactionSave } from '../services/InteractionService'



function Detail() {

    const navigate = useNavigate()


    const loc = useLocation()
    const [item, setItem] = useState<CandidateInfo>()

    const [inteactions, setInteactions] = useState<InteractionInfo[]>([])

    const [date, setDate] = useState(new Date());
    const [content, setContent] = useState('')
    const [candidateResponded, setCandidateResponded] = useState(false)
    const [interactionType, setInteractionType] = useState('')
    const canId = loc.state.candidateId
    const interType = [
        "PHONE",
        "EMAIL"
    ]
    useEffect(() => {
        const itm = loc.state as CandidateInfo
        setItem(itm)
    }, [])
    useEffect(() => {
        getCanInterList(canId).then(res => {
            const arr = res.data.result
            setInteactions(arr)
        })
    }, [])


    //interaction save
    const funcSave = (evt: React.FormEvent) => {
        evt.preventDefault()
        interactionSave(canId, content, candidateResponded, interactionType, date).then(res => {
            if (res.status === 200) {
                interactionListUpdate(canId)
                toast.success("New interaction added", {
                    position: toast.POSITION.TOP_CENTER
                });

            } else {
                toast.error("New interaction didn't add!", {
                    position: toast.POSITION.TOP_CENTER

                });
            }
             setContent("")
             setInteractionType("")
             setCandidateResponded(false)
  
        })
    }

    //interaction delete
    const funcDelete = (interactionId: number) => {
        interactionDelete(interactionId).then(res => {
            if (res.status === 200) {
                interactionListUpdate(canId)
                toast.success("Interaction deleted", {
                    position: toast.POSITION.TOP_CENTER
                });

            } else {
                toast.error("Interaction didn't delete", {
                    position: toast.POSITION.TOP_CENTER

                });
            }
        })
    }
    const funcChangeStatus = (interactionId: number) => {
        interactionChangeStatus(interactionId).then(res => {
            if (res.status === 200) {
                interactionListUpdate(canId)
                toast.success("Interacaction status changed", {
                    position: toast.POSITION.TOP_CENTER
                });

            } else {
                toast.error("Interacaction status didn't change", {
                    position: toast.POSITION.TOP_CENTER

                });
            }
        })
    }
    // go to update
    const gotoUpdate = (item: InteractionInfo) => {
        navigate('/updateinteraction/' + item.interactionId, { state: item })
    }
    //interaction list
    const interactionListUpdate = (candidateId: number) => {
        getCanInterList(candidateId).then(res => {
            const interactionList = res.data.result
            setInteactions(interactionList)
        })
    }
    return (
        <>
            <br />
            <br />
            <div>
                <h2 className="text-center fw-bold fs-5 modal-title mb-3" style={{ backgroundColor: "#D3D3D3" }}>
                    Details</h2>
                <div className="container">
                    <div className="row">
                        {item &&
                            <div className="col-md-3 py-5 ">
                                <div style={{ backgroundColor: "#D3D3D3", height: 200, width: 200 }}>
                                    <h4 className="display-4 text-center" > <i className="fa fa-user fa-4x "></i> </h4>
                                    <h3 className='display-6 my-4  text-center'>
                                        {item.nameSurname}
                                    </h3>
                                </div>
                            </div>
                        }
                        <div className="col-md-9 py-5">
                            <div className="container my-4">
                                <div className="container">
                                    <div className='d-flex justify-content-start'>
                                        <button type="button" className="btn btn-success btn-sm mb-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className='bi bi-plus-lg'></i> Add</button>
                                    </div>
                                    <div className="row">
                                        <div className='col'>
                                            <table className="table mb-0" >
                                                <thead style={{ backgroundColor: "#BECFDE" }}>
                                                    <tr>
                                                        <th >InteractionType</th>
                                                        <th>Content</th>
                                                        <th >Date</th>
                                                        <th >Candidate Responded</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>

                                                    </tr>
                                                </thead>
                                                {inteactions.map((item, index) =>
                                                    <tbody key={index}>
                                                        <tr>
                                                            <td>{item.interactionType}</td>
                                                            <td>{item.content}</td>
                                                            <td>{item.date.toString()}</td>
                                                            <td>
                                                                <input type="checkbox" name="Active" checked={item.candidateResponded === false ? false : true} />


                                                            </td>
                                                            <td> <a onClick={() => gotoUpdate(item)} role='button' className="btn btn-success btn-sm" >Update</a>
                                                            </td>
                                                            <td> <a onClick={() => funcDelete(item.interactionId)} role='button' className="btn btn-danger btn-sm" >Delete</a></td>
                                                        </tr>
                                                    </tbody>
                                                )}
                                            </table>
                                        </div>
                                    </div>
                                    <div className='row d-flex justify-content-end'>
                                        <div className='col-sm-6 text-end'>
                                            <form onSubmit={funcSave}>
                                                <div className='mb-3'>
                                                </div>
                                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Interaction</h1>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">

                                                                <select value={interactionType} onChange={(evt) => setInteractionType(evt.target.value)} className="form-select mb-1">
                                                                    <option selected>Select Category</option>
                                                                    {interType.map((item, index) =>
                                                                        <option key={index} value={item}>{item}</option>
                                                                    )}</select>
                                                                <input value={content} onChange={(evt) => setContent(evt.target.value)} required type='text' placeholder='content' className='form-control mb-1' />
                                                                <label className='col-form-label float-left' htmlFor="">Candidate Responded</label>
<br />
                                                                <input onChange={(evt) => setCandidateResponded(evt.target.checked)} className="form-check-input" value="candidateResponded" type="checkbox" />
                                                                <br />

                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type='submit' className='btn btn-success' data-bs-dismiss="modal">Save</button>
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Detail