import { Route, Routes } from "react-router-dom"

import { NavBar } from "../components/ui/NavBar"
import { DcScreen } from '../components/dc/DcScreen'
import { MarvelScreen } from '../components/marvel/MarvelScreen'
import { SearchScreen } from '../components/search/SearchScreen'
import { HeroScreen } from "../components/hero/HeroScreen"

export const DashboardRoutes = () => {
  return (
      <>
          <NavBar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<MarvelScreen />} />
          <Route path="marvel" element={<MarvelScreen />} />
          <Route path="search" element={<SearchScreen/>} />
          <Route path="dc" element={<DcScreen/>} />
          <Route path="hero/:heroId" element={<HeroScreen/>} />
        </Routes>
    </div>
      </>
  )
}
