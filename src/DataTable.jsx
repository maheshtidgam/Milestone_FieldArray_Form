import React, { useState, useEffect, act } from 'react'

const DataTable = ({ onBack, handleEdit }) => {
    const headerTitle = [
        {
            label: "Mlestone No",
            key: "",
        },
        {
            label: "Milestone Name",
            key: "milestoneName",

        },
        {
            label: "No. of Deliveries",
            key: "deliveries",

        },
        {
            label: "No. of Activities",
            key: "activities",

        }
        ,
        {
            label: "Action",
            key: ""
        }
    ]

    const [dataArray, setDataArray] = useState([
        {
            sr_no: 1,
            milestoneName: '',
            activities: [{ activityName: '' }],
            deliveries: [{ deliveryName: '' }],
        }
    ])

    useEffect(() => {
        const milestones = localStorage.getItem('milestones');
        if (milestones) {
            const parsedMilestones = JSON.parse(milestones);
            setDataArray(parsedMilestones);

        }
    }, []);

    const handleDelete = (indexToDelete) => {
        const updatedData = dataArray.filter((item, index) => index !== indexToDelete);
        setDataArray(updatedData);
        localStorage.setItem('milestones', JSON.stringify(updatedData));
    };

    return (
        <div>


            <div className='flex flex-col items-center justify-center'>
                <button
                    onClick={onBack}
                    className="mb-4 mt-6 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back
                </button>
                <table className="table-auto w-[900px] border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            {headerTitle.map((header, index) => (
                                <th key={index} className="border border-gray-200 px-4 py-2 text-left">{header.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataArray.map((data, index) => (
                            <tr key={index}>
                                <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-200 px-4 py-2">{data?.milestoneName || "-"}</td>
                                <td className="border border-gray-200 px-4 py-2">{data?.deliveries?.length || 0}</td>
                                <td className="border border-gray-200 px-4 py-2">{data?.activities?.length || 0}</td>

                                <td className="border border-gray-200 px-4 py-2">
                                    <button className="bg-white hover:bg-gray-200 text-white font-bold py-2 px-4 rounded-full m-2" onClick={() => handleEdit(data, index)}><i className='fa fa-edit text-blue-600 cursor-pointer' aria-hidden="true"></i></button>
                                    <button onClick={() => handleDelete(index)} className="bg-white hover:bg-gray-200 text-white font-bold py-2 px-4 rounded-full"> <i className='fa fa-trash text-red-600 cursor-pointer' aria-hidden="true"></i></button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>



        </div>
    )
}

export default DataTable
