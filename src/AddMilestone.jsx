import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    milestoneName: Yup.string().required('Milestone Name is required'),
    deliveries: Yup.array().of(
        Yup.object({
            deliveryName: Yup.string().required('Delivery Name is required'),
        })
    ),
    activities: Yup.array().of(
        Yup.object({
            activityName: Yup.string()
                .required('Activity Name is required')
                .max(500, 'Maximum 500 characters'),
        })
    ),
})

const EditMilestoneForm = ({ data, onClose, onUpdate, }) => {
    const [initialValues, setInitialValues] = useState({
        milestoneName: '',
        deliveries: [{ deliveryName: '' }],
        activities: [{ activityName: '' }],
    })




    useEffect(() => {
        if (data) {
            setInitialValues({
                milestoneName: data.milestoneName || '',
                deliveries: data.deliveries || [{ deliveryName: '' }],
                activities: data.activities || [{ activityName: '' }],
            })
        }
    }, [data])

    const handleSubmit = (values) => {
        const updated = {
            ...data,
            milestoneName: values.milestoneName,
            deliveries: values.deliveries,
            activities: values.activities
        }

        console.log(updated, "updated data")

        onUpdate(updated)
    }


    const handleCancel = () => {
        onClose()
    }
    return (
        <div className='max-w-2xl mx-auto p-6 bg-white rounded shadow'>
            <h2 className='text-2xl font-semibold mb-4'>Milestone</h2>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >

                {({ values, errors, touched }) => (
                    <Form>
                        <div className='mb-4'>
                            <label htmlFor="milestoneName" className='block font-medium mb-1'>Milestone3</label>
                            <Field
                                name="milestoneName"
                                type="text"
                                className='border border-gray-300 rounded p-2 w-full'
                                placeholder='Enter milestone name'>

                            </Field>
                            <ErrorMessage name="milestoneName" component="div" className='text-red-500 text-sm' />

                        </div>

                        {/* Deliveries */}
                        <FieldArray name='deliveries'>
                            {({ remove, push }) => (
                                <div className='mb-6 p-4 '>
                                    <div className='flex justify-between items-center p-2 mb-4 rounded border border-purple-200 bg-purple-50'>
                                        <label className='font-semibold text-lg'>
                                            Deliveries ({values?.deliveries.length})
                                        </label>
                                        <button
                                            type='button'
                                            className='text-blue-500 hover:text-blue-700 text-sm border border-blue-300 px-3 py-1 rounded-full text-center'
                                            onClick={() => push({ deliveryName: '' })}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {values.deliveries.map((_, index) => (
                                        <div key={index} className='flex flex-row gap-4 mb-4'>
                                            <div className='flex-1'>
                                                <Field
                                                    name={`deliveries.${index}.deliveryName`}
                                                    type='text'
                                                    className='border border-gray-300 rounded p-2 w-full'
                                                    placeholder={`Enter Delivery ${index + 1} name`}
                                                />
                                                <ErrorMessage
                                                    name={`deliveries.${index}.deliveryName`}
                                                    component='div'
                                                    className='text-red-500 text-sm'
                                                />
                                            </div>
                                            {values.deliveries.length > 1 && (
                                                <button
                                                    type='button'
                                                    onClick={() => remove(index)}
                                                    className='text-red-500 hover:text-red-700'
                                                >
                                                    <i className='fa fa-trash text-red-600 cursor-pointer' aria-hidden='true'></i>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FieldArray>
                        {/* Activities */}
                        <FieldArray name='activities'>
                            {({ remove, push }) => (
                                <div className='p-4 grid grid-cols-3 gap-4'>
                                    {values.activities.map((_, index) => (
                                        <div
                                            key={index}
                                            className='flex flex-col relative w-full'
                                        >
                                            <h5 className='mb-1'>Activity {index + 1}</h5>

                                            {/* Delete Button */}
                                            {values.activities.length > 1 && (
                                                <button
                                                    type='button'
                                                    onClick={() => remove(index)}
                                                    className='absolute top-1 right-2 text-red-500 hover:text-red-700'
                                                >
                                                    <i className='fas fa-times text-red-600 cursor-pointer'></i>
                                                </button>
                                            )}


                                            <Field
                                                name={`activities.${index}.activityName`}
                                                type='text'
                                                className='border border-gray-300 rounded p-2 w-full'
                                                placeholder={`Enter Activity ${index + 1} name`}
                                            />


                                            <div className='min-h-[1.25rem]'>
                                                <ErrorMessage
                                                    name={`activities.${index}.activityName`}
                                                    component='div'
                                                    className='text-red-500 text-sm'
                                                />
                                            </div>
                                        </div>
                                    ))}


                                    <div className='flex flex-col justify-start w-full'>
                                        <h5 className='invisible mb-1'>Spacer</h5>
                                        <button
                                            type='button'
                                            className='text-blue-500 hover:text-blue-700 text-sm border border-blue-300 px-3 py-2 rounded-lg text-center w-full'
                                            onClick={() => push({ activityName: '' })}
                                        >
                                            + Add Activity
                                        </button>
                                    </div>
                                </div>
                            )}
                        </FieldArray>
                        <div className='flex justify-end items-center mt-6'>
                            <button type="button" onClick={handleCancel} className='bg-white text-purple-500 border border-solid border-purple-500  px-4 py-2 rounded mr-4 hover:bg-gray-400'>Cancel</button>
                            <button type="submit"  className='bg-white border border-solid border-purple-500 text-purple-500 px-4 py-2 rounded hover:bg-gray-400'>Submit</button>

                        </div>


                    </Form>
                )}

            </Formik >


        </div >
    )
}

export default EditMilestoneForm
