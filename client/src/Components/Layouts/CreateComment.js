import axios from 'axios'
import React, { useState, useRef } from 'react'
import { Comment } from '../../Recoil-State/Atom'
import { useRecoilState } from 'recoil'
var addCommentURL = process.env.REACT_APP_API_PATH + '/comment/create'

function CreateComment(props) {
  const [comment, setComment] = useRecoilState(Comment)
  const [comments, setComments] = useState([{ value: '' }])
  console.log(comments)
  console.log(props.index, 'dsjfks')

  const getRef = useRef(null)
  const handleOnChangeComment = (index, event) => {
    event.preventDefault()
    let data = [...comments]
    data[index] = { value: event.target.value }
    setComments(data)
  }

  const handleOnSubmit = async (index, event) => {
    event.preventDefault()
    getRef.current.focus()
    console.log(comments[index].value)
    try {
      let commentBody = { comment: comments[index].value, todoId: props.todoId }
      const response = await axios.post(addCommentURL, commentBody)

      if (response.data.message) {
        setComment(commentBody)
        setComments([{ value: '' }])
      } else {
        throw new Error(`Can't post the api`)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <form
            class="commentForm"
            onSubmit={(event) => handleOnSubmit(props.index, event)}
          >
            <div className="container-fluid comment-container">
              <div className="row">
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control todo-comment"
                    placeholder="your comment"
                    name="comment"
                    value={comments.value}
                    ref={getRef}
                    onChange={(event) =>
                      handleOnChangeComment(props.index, event)
                    }
                  />
                </div>
                <div className="col-4">
                  <button
                    type="submit"
                    class="comment-btn comment-btn--primary uppercase"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateComment
