import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b md:px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        <img
          src="/placeholder.svg"
          alt="ShopeeFood Logo"
          className="h-10"
          width="40"
          height="40"
          style={{ aspectRatio: '40 / 40', objectFit: 'cover' }}
        />
        <div className="flex items-center space-x-2">
          <span className="font-bold">ShopeeFood</span>
          <button
            type="button"
            role="combobox"
            aria-controls="radix-:rm:"
            aria-expanded="false"
            aria-autocomplete="none"
            dir="ltr"
            data-state="closed"
            data-placeholder=""
            className="location-button"
            id="location"
          >
            <span style={{ pointerEvents: 'none' }}>TP. HCM</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down h-4 w-4 opacity-50"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
        </div>
      </div>
      <nav className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
        <a className="font-bold text-red-500 md:text-lg lg:text-xl" href="#">
          Đồ ăn
        </a>
        <a className="md:text-lg lg:text-xl" href="#">
          Thực phẩm
        </a>
        <a className="md:text-lg lg:text-xl" href="#">
          Rượu bia
        </a>
        <a className="md:text-lg lg:text-xl" href="#">
          Hoa
        </a>
        <a className="md:text-lg lg:text-xl" href="#">
          Siêu thị
        </a>
        <a className="md:text-lg lg:text-xl" href="#">
          Thuốc
        </a>
        <a className="md:text-lg lg:text-xl" href="#">
          Thú cưng
        </a>
      </nav>
      <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
        <button className="login-button">Đăng nhập</button>
        <img
          src="/placeholder.svg"
          alt="Vietnam Flag"
          className="h-5 md:h-6 lg:h-7"
          width="30"
          height="20"
          style={{ aspectRatio: '30 / 20', objectFit: 'cover' }}
        />
      </div>
    </header>
  )
}

export default Header
