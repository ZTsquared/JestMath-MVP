import {useState, useEffect} from 'react'

//portal for submitting or vetting questions and jokes, or setting other settings
//to open the parent portal you need to answer some question kids won't know (history?)
//this is where a parent should log into the household account.  if an account is not logged in then then a ling to the parent portal should be the only thing you see when you go to the welcome screen.
// best would be to see player history -  details about what they got right and wrong and what wrong answers they tried before getting the right one.
// but his would require storing a lot of data I am not currently storing.
function ParentPortal() {

    const [newQuestion, setNewQuestion] = useState("");
    const [questionUploadMsg, setQuestionUploadMsg] = useState("");
    
    async function postQuestion () {
        // console.log("attempting to post question");
        try {
            // console.log("entering try block");
            const resultJSON = await fetch (`/api/questions/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"question" : newQuestion}),
            })
            const resultObject = await resultJSON.json()
            setQuestionUploadMsg(resultObject.msg)
            console.log("result JSON")
            console.log(resultJSON)
            // console.log("result object")
            // console.log(resultObject)
            if (resultJSON.ok){
                setNewQuestion("");
            }
        } catch (err) {
            console.log(err)
        }
    }

    // async function addToBalance(quantity) {
    //     try {
    //       await fetch (`/api/users/${currentUser.userName}/increaseBalance/`, {
    //         method: "PUT",
    //         headers: {
    //           "Content-Type": "application/json"
    //         },
    //        body: JSON.stringify({"quantity" : quantity})
    //       });
    //       await fetch (`/api/users/${currentUser.userName}/increaseLifetimeTotal/`, {
    //         method: "PUT",
    //       headers: {
    //           "Content-Type": "application/json"
    //         },
    //        body: JSON.stringify({"quantity" : quantity})
    //       });
    //       getUser()
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }

    const handleInputChange = (e) => {
        console.log(questionUploadMsg)
        setQuestionUploadMsg("")
        setNewQuestion(e.target.value)
        console.log(newQuestion)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handling submit");
        postQuestion();
    }



    return (
    <div>
        <div>Add Question</div>
        <form onSubmit={handleSubmit}>
            <input value = {newQuestion} onChange = {handleInputChange} type="text" />
            <button>Upload Question</button>
            {questionUploadMsg ? <div>Upload failed: {questionUploadMsg}</div> : <div><br/></div>}
            <div>{questionUploadMsg?.msg}</div>
        </form>
        <div>Curate Questions</div>
        <br /><br /><br />
        <div>Add Jokes</div>
        {/* drop down to select joke type (Knock Knock or Riddle),
        input like for setUp and punchLine
        conditional formating to wrap knock knock joke in extra standard 
        likes so the joke makes sense */}
        <div>Curate Jokes</div>
    </div>
    )
}

export default ParentPortal