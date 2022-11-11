import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CandidateInfo, candidateStatus, ICandidate } from '../models/ICandidate'
import { InteractionInfo } from '../models/IInteraction'
import { candidateDelete, candidateList, candidateSave, candidateUpdate, findByCandidateId } from '../services/candidateService'
import validator from 'validator'

function Candidate() {
    const navigate = useNavigate()

    const { candidateId } = useParams()
    const numId = Number(candidateId)

    const [nameSurname, setNameSurname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [candidateStatus, setCandidateStatus] = useState('')


    const [candidates, setCandidates] = useState<CandidateInfo[]>([])
    const [interactions, setInteractions] = useState<InteractionInfo[]>([])
    const [can, setCan] = useState<CandidateInfo>()
    const loc = useLocation()
    const [emailError, setEmailError] = useState('')


    const canStatus = [
        "SOURCED",
        "INTERVIEWING",
        "OFFER_SENT",
        "HIRED"
    ]

    useEffect(() => {
        candidateList().then(res => {
        })
        console.log(can);

        candidateListUpdate(numId)
    }, [])

    //candidate save
    const funcSave = (evt: React.FormEvent) => {
        evt.preventDefault()
        candidateSave(nameSurname, phone, email, candidateStatus).then(res => {
            if (res.status === 200) {
                candidateListUpdate(numId)
                toast.success("New candidate added", {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                toast.error("New candidate didn't add!", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        })
        setNameSurname("")
        setEmail("")
        setPhone("")
        setCandidateStatus("")
    }

    //candidate delete
    const funcDelete = (candidateId: number) => {
        candidateDelete(candidateId).then(res => {
            if (res.status === 200) {
                candidateListUpdate(numId)
                toast.success("Candidate deleted", {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                toast.error("Candidate didn't delete!", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        })
    }

    //Change Status candidate 
    const funcChangeStatus = (item: CandidateInfo) => {
        navigate('/changeStatus/' + item.candidateId, { state: item })
    }
    //Update candidate 
    const funcUpdate = (evt: React.FormEvent) => {
        candidateUpdate(Number(candidateId), nameSurname, phone, email, candidateStatus).then(res => {
            if (res.data.status) {
                candidateListUpdate(numId)
            }
        })
    }


    //candidate list
    const candidateListUpdate = (candidateId: number) => {
        candidateList().then(res => {
            const canList = res.data.result
            setCandidates(canList)
        })
    }

    //candidate detail
    const gotoDetail = (item: CandidateInfo) => {
        navigate('/detail/' + item.candidateId, { state: item })
    }
    const gotoUpdate = (item: CandidateInfo) => {
        navigate('/updatecandidate/' + item.candidateId, { state: item })
    }
    return (
        <>
            <h2 className="text-center fw-bold fs-5 modal-title mb-3" style={{ backgroundColor: "#D3D3D3" }}> Talent Sourcing System</h2>
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
                                        <th >Candidate ID</th>
                                        <th>Name Surname</th>
                                        <th >Email</th>
                                        <th >Phone</th>
                                        <th >Candidate Status</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                {candidates.map((item, index) =>
                                    <tbody key={index}>
                                        <tr>
                                            <td>{item.candidateId}</td>
                                            <td>{item.nameSurname}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>
                                                {item.candidateStatus}
                                            </td>
                                            <td className='d-flex justify-content-end'>
                                                <a onClick={() => gotoDetail(item)} className="btn btn-success btn-sm">Detail</a>
                                            </td>
                                            <td> <a onClick={() => funcChangeStatus(item)} role='button' className="btn btn-primary btn-sm" >Change Status</a>
                                            </td>
                                            <td>
                                                <a onClick={() => gotoUpdate(item)} role='button' className="btn btn-secondary btn-sm" >Edit</a>

                                            </td>
                                            <td> <a onClick={() => funcDelete(item.candidateId)} role='button' className="btn btn-danger btn-sm" >Delete</a></td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>


                    </div>
                    <div className='row d-flex justify-content-end'>
                        <div className='col-sm-6 text-end'>
                            <form onSubmit={funcSave} className="row g-3 needs-validation">
                                <div className='mb-3'>
                                </div>
                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Candidate</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <input value={nameSurname} onChange={(evt) => setNameSurname(evt.target.value)} required type='text' placeholder='Name Surname' className='form-control mb-1' />
                                                <input value={phone} onChange={(evt) => setPhone(evt.target.value)} required type='number' placeholder='Phone' className='form-control mb-1' />
                                                <input id="userEmail" value={email} onChange={(evt) => setEmail(evt.target.value)} required type="email" placeholder='Email' className='form-control mb-1' />
                                                <div className="invalid-feedback">
                                                    Please enter Email.
                                                </div>
                                                <select value={candidateStatus} onChange={(evt) => setCandidateStatus(evt.target.value)} className="form-select mb-1">
                                                    <option selected>Select Category</option>
                                                    {canStatus.map((item, index) =>
                                                        <option key={index} value={item}>{item}</option>
                                                    )}</select>
                                            </div>
                                            <div className="modal-footer">
                                                <button data-bs-dismiss="modal" type='submit' className='btn btn-success' >Save</button>
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
           
        </>
        
    )

}

export default Candidate