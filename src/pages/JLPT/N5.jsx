import { useState } from "react"
import VocabularyList from "../../components/shared/VocabularyList"
import Header  from "../../components/shared/Header"
import Footer from "../../components/shared/Footer";

function N5() {
  return(
    <div>
        <Header/>
        <div className="mt-4">
        <VocabularyList />  
        </div>
      <Footer/>
    </div>

  ) 
}

export default N5;