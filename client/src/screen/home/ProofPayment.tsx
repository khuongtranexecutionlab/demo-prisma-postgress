import React from 'react'

const ProofPayment: React.FC = () => {
  return (
    <aside className="w-1/4 p-4 bg-white">
      <div className="p-4 border rounded bg-red-100">
        <img
          src="https://shopeefood.vn/app/assets/img/qrcode.png?02f483efc36fa5fafaa4254671fa5492"
          alt="QR Code"
          className="w-full"
          width="200"
          height="200"
          style={{ aspectRatio: '200 / 200', objectFit: 'cover' }}
        />
      </div>
    </aside>
  )
}

export default ProofPayment
