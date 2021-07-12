import React, { Component, Fragment } from "react";
import LogoUpeu, {
  ReactComponent as Logo,
} from "../../assets/icons/Logo_upeu.svg";
import { ReactComponent as Help } from "../../assets/icons/lifebuoy.svg";
import { ReactComponent as Noti } from "../../assets/icons/active.svg";
import AuthService from "../../auth/auth.service";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default class Navbar extends Component {
  state = {
    user: {},
    open: false,
  };

  componentDidMount() {
    if(AuthService.getCurrentUser() !== null){
      this.setState({
        user: AuthService.getCurrentUser().user[0],
      });
    }

  }

  openProfile = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };
  onLogOut = () => {
    AuthService.logout();

  }


  render() {
    const {
      state: { user },
    } = this;
    return (
      <>
        <header className="bg-gray-50  h-36  md:h-24 w-full md:flex p-4">
          <div className="flex items-center w-full h-16 justify-center md:justify-start">
            <img src={LogoUpeu} alt="" className="w-96" />
          </div>

          <div className=" flex items-center justify-center md:justify-end">
            <ul className="flex items-center">
              <hr className="border-l-2 border-gray-400 w-0 md:h-16" />
              <li className="mx-4">
                <a href="ss">
                  <Help></Help>
                </a>
              </li>
              <li className="mx-4">
                <a href="ss">
                  <Noti></Noti>
                </a>
              </li>
              <hr className="border-l-2 border-gray-400 w-0 md:h-16" />
              <div className="flex flex-col">
                <button onClick={this.openProfile}>
                 
                </button>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="inline-flex justify-center w-full rounded-md  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                      <li className="flex mr-10 items-center mx-center">
                    <span className="mx-4">
                      {user.nombre} {user.apellido}
                    </span>
                    <img src={user.foto} className="w-14 rounded-2xl" alt="" />
                  </li>
                        {/* <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        /> */}
                      </Menu.Button>
                    </div>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">

                          <form onSubmit={this.onLogOut}>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="submit"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full text-left px-4 py-2 text-sm"
                                  )}
                                >
                                  Log Out
                                </button>
                              )}
                            </Menu.Item>
                          </form>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </ul>
          </div>
        </header>
        <hr className="w-full border border-upeu-3 bg-upeu-3 h-4" />
      </>
    );
  }
}
