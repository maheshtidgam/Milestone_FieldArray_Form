import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import AddMilestone from './AddMilestone'
import DataTable from './DataTable'


const MilestoneDisplay = () => {
    const [editMilestone, setEditMilestone] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null)
    const [showTable, setShowTable] = useState(false)
    const [initialValues, setInitialValues] = useState({
        milestones: [
            {
                sr_no: 1,
                weightage: '',
                milestoneCost: '',
                fundTransferAmount: '',
                milestoneName: '',
                deliveries: [{ deliveryName: '' }],
                activities: [{ activityName: '' }],
            }
        ]
    }
    )
    const validationSchema = Yup.object().shape({
        milestones: Yup.array().of(
            Yup.object().shape({
                weightage: Yup.number().required("Weightage is Requires"),
                milestoneCost: Yup.number().required("Milestone cost is required"),
                fundTransferAmount: Yup.number().required("Fund transffer amount is required"),
            })
        ).min(1, "At least one milestone is required"),
    })
    const handleSubmit = (values) => {
        console.log(values)
        localStorage.setItem('milestones', JSON.stringify(values.milestones))
        alert('Milestones saved to localStorage!')
        setShowTable(true)
    }
    useEffect(() => {
        const savedMilestones = localStorage.getItem('milestones')
        if (savedMilestones) {
            setInitialValues({ milestones: JSON.parse(savedMilestones) })
        }
    }, [showTable])

    const handleUpdateMilestone = (updatedData) => {
        const updatedMilestones = [...initialValues.milestones]
        updatedMilestones[editIndex] = { ...updatedMilestones[editIndex], ...updatedData }

        setInitialValues({ milestones: updatedMilestones })
        localStorage.setItem('milestones', JSON.stringify(updatedMilestones))
        setShowEditForm(false)
    }


    const handleBack = () => {
        setShowTable(false)
    }


    const handleEdit = (milestone, index) => {
        setEditMilestone(milestone);
        setShowEditForm(true);
        setEditIndex(index);
    }

    if (showEditForm) {
        return (
            <AddMilestone data={editMilestone} onClose={() => setShowEditForm(false)} onUpdate={handleUpdateMilestone} />
        )
    }


    return (
        <div className='max-w-5xl mx-auto p-6'>
            {!showTable ? <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}

            >
                {({ values, errors, touched }) => (
                    <Form>
                        <FieldArray name="milestones">
                            {({ remove, push }) => (
                                <div>
                                    {values.milestones.map((milestone, index) => (
                                        <div key={index} className='mb-6 p-4 rounded-xl shadow-lg border border-gray-200 bg-white'>
                                            <div className='flex flex-row justify-between items-center mb-4'>
                                                <div> <p className='text-sm font-medium text-gray-800'>Milestone {index + 1}</p>
                                                    <p className='text-xs text-purple-600 font-semibold'>{milestone.milestoneName}</p>
                                                </div>
                                                <div className='text-center'>
                                                    <span className='text-lg font-bold text-gray-900'>{milestone?.deliveries?.length}</span><span className='text-sm text-gray-600 ml-1'>Delivery</span>
                                                </div>
                                                <div>
                                                    <span className='text-lg font-bold text-gray-900'>{milestone?.activities?.length}</span><span className='text-sm  text-gray-600  ml-1'>Activities</span>
                                                </div>
                                                <div className='flex flex-row items-center gap-3'>
                                                    <button type="button" onClick={() => {
                                                        if (values.milestones.length > 1) {
                                                            remove(index);

                                                        } else {
                                                            alert("At least one milestone is required");
                                                        }
                                                    }} className=' text-red-500 hover:text-red-700'>
                                                        <i className='fa fa-trash text-red-600 cursor-pointer' aria-hidden="true"></i>
                                                    </button>
                                                    <button type='button' onClick={() => handleEdit(milestone, index)} className='text-purple-500 hover:text-purple-700'>
                                                        <i className='fa fa-edit text-blue-600 cursor-pointer' aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className='flex flex-row gap-4  p-4 rounded-lg'>
                                                <div className=' flex-1'>
                                                    <h4 className=' text-sm font-medium text-gray-800 mb-1'>Weightage<span className="text-red-500">*</span></h4>
                                                    <div className='border border-solid border-gray-400'> <Field type="number" name={`milestones.${index}.weightage`} placeholder="Weightage" className='w-full' /></div>
                                                    <ErrorMessage name={`milestones.${index}.weightage`} component="div" className="text-red-500 text-sm" />
                                                </div>
                                                <div className=' flex-1'>
                                                    <h4 className='text-sm text-gray-800 mb-1 font-medium'>Milestone Cost<span className="text-red-500">*</span></h4>
                                                    <div className='border border-solid border-gray-400'> <Field type="number" name={`milestones.${index}.milestoneCost`} placeholder="Milestone Cost" className='w-full' /></div>
                                                    <ErrorMessage name={`milestones.${index}.weightage`} component="div" className="text-red-500 text-sm" />

                                                </div>
                                                <div className='flex-1'>
                                                    <h4 className='text-sm font-medium text-gray-800 mb-1 '>Fund Transfer Amount<span className="text-red-500">*</span></h4>
                                                    <div className='border border-solid border-gray-400' > <Field type="number" name={`milestones.${index}.fundTransferAmount`} placeholder="Fund Transfer Amount" className='w-full' /></div>
                                                    <ErrorMessage name={`milestones.${index}.weightage`} component="div" className="text-red-500 text-sm" />

                                                </div>
                                            </div>


                                        </div>
                                    ))}
                                    <div className='flex flex-row justify-center items-center mb-4 p-4 rounded-xl shadow-lg' ><i className='fa fa-plus text-blue-600 cursor-pointer' aria-hidden="true"></i>
                                        <button type="button" onClick={() => push({ sr_no: values.milestones.length + 1, milestoneName: '', weightage: '', milestoneCost: '', fundTransferAmount: '' })}>Add Milestone</button>

                                    </div>
                                </div>
                            )}
                        </FieldArray>
                        <div className='flex flex-row justify-end items-center mb-4 p-4 shadow-lg'>
                            <button type="submit" className='bg-white shadow-lg border border-solid border-purple-500 hover:bg-indigo-50 text-purple-800 font-bold py-2 px-4 rounded'>Save & Continue</button>

                        </div>
                    </Form>
                )}

            </Formik> : (
                <DataTable onBack={handleBack} setEditIndex={setEditIndex} handleEdit={handleEdit} />
            )}




        </div>

    )
}

export default MilestoneDisplay