import React from 'react'

const FormEditUser = () => {
  return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className='subtitle'>Update User</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form >
               
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <imput type="text" className="input" placeholer='Name'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <imput type="text" className="input" placeholer='Email'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <imput type="password" className="input" placeholer='******'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control">
                            <imput type="password" className="input" placeholer='******'/>
                        </div>
                    </div>
                    <form >
                    <div className="field">
                        <label className="label">Role</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select>
                                    <option value="admin">Admin</option>
                                    <option value="user">user</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <button className="button is-success">Update</button>
                        </div>
                    </div>
                </form>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditUser