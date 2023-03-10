import React from 'react'

const Doctor = ({doctor}) => {
  return (
    <div className="shadow-card p-2 flex flex-col cursor-pointer text-black/60 gap-2">
      <h1 className='text-xl font-semibold'>
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr className="text-black  border-2 w-[90%] mt-2"/>
      <span className="flex gap-2">
        <p className="font-bold">Phone Number : </p>
        {doctor.phoneNumber}
      </span>
      <span className="flex gap-2">
        <p className="font-bold">Address : </p>
        {doctor.address}
      </span>
      <span className="flex gap-2">
        <p className="font-bold">Fee Per Visit : </p>
        {doctor.feePerCunsultation}
      </span>
      <span className="flex gap-2">
        <p className="font-bold">Timing : </p>
        {doctor.timings[0]} - {doctor.timings[1]}
      </span>
    </div>
  );
}

export default Doctor