//react
import React from "react"
import { Outlet } from "react-router-dom"

//components
import Header from "../components/Header/Header"

const GeneralLayout: React.FC = () => (
  <div className="wrapper">
    <Header />
    <div className="content">
      <div className="container">
        <Outlet />
      </div>
    </div>
  </div>
)

export default GeneralLayout