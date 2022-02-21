import { HeroList } from "../hero/HeroList"

export const MarvelScreen = () => {
  const  publisherHeroe = 'Marvel Comics'  
  return (
      <div>
      <h1>MarvelScreen</h1>
      <hr />
      <HeroList publisher={publisherHeroe}/>
      </div>
    )
  }