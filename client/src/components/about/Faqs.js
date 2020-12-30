import './Faqs.scss';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {createQuestion, getQuestions, deleteQuestion} from '../../actions/homeActions';
import {FiUpload} from 'react-icons/fi';
import {RiDeleteBin5Line} from 'react-icons/ri';
import ReactHtmlParser from 'react-html-parser';

const Faqs = ({auth:{user}, home:{question}, createQuestion, getQuestions, deleteQuestion}) => {

    const replace = (str) => str.replace(/\//g, "<br/>")

    useEffect(() => {
        getQuestions()
    }, [getQuestions])

    const [formData, setFormData] = useState({
        title: "",
        description: "",
    })

    const onSubmit = (e) => {
        e.preventDefault()
        createQuestion(formData)
    }

    return (
        <div className="faq-container">
            {!user ? "" : user.role === "admin" ? 
                <form onSubmit={(e) => onSubmit(e)}>  
                    <input type="text" placeholder="Title" onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                    <textarea type="text" placeholder="Description use / for break" onChange={(e) => setFormData({...formData, description: e.target.value})} required />

                    <button><FiUpload/></button>
                </form>
            : "" }

            <div className="question-content">
            <h1>Frequently Asked Questions</h1>
            {!question ? "" : question.map(el =>  
                <div key={el._id} className="questions">
                    <h2>{el.title} {!user ? "" : user.role === "admin" ? <button onClick={() => deleteQuestion(el._id) }><RiDeleteBin5Line/></button> : ""}</h2>
                    <p>{ReactHtmlParser(replace(el.description))}</p>
                </div>
            )}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.authReducers,
    home: state.homeReducers
})

export default connect(mapStateToProps, {createQuestion, getQuestions, deleteQuestion} )(Faqs)
