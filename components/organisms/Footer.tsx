import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-white  border-t mt-2">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <Link
            href="/"
            className="ml-4 flex justify-center overflow-hidden items-center lg:ml-0 w-36 h-36"
            passHref
          >
            <div className="bg-[url('/logo.png')] bg-cover w-full h-full" />
          </Link>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-xs font-semibold text-gray-900 uppercase ">Thông tin</h2>
              <ul className="text-gray-600  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline text-xs">
                    Sản phẩm
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-xs">
                    Địa chỉ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-xs font-semibold text-gray-900 uppercase ">Kênh bán</h2>
              <ul className="text-gray-600  font-medium">
                <li className="mb-4">
                  <a
                    href="https://www.facebook.com/beliystores"
                    className="hover:underline text-xs "
                  >
                    Facebook
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.instagram.com/beliystore/"
                    className="hover:underline text-xs"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@beliystresswear"
                    className="hover:underline text-xs"
                  >
                    Tiktok
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-xs font-semibold text-gray-900 uppercase ">Giới thiệu</h2>
              <ul className="text-gray-600  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline text-xs">
                    Pet Store
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-xs">
                    Olded Store
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-xs text-gray-500 sm:text-center ">
            © 2023{' '}
            <a href="/" className="hover:underline text-xs">
              BeliyStore
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
