import { useState } from 'react';
import { useSession } from '../hooks/useSession';

export function Register() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        avatar: undefined,
    });
    const { register } = useSession()!;

    const handleChange = (e: any) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        const { avatar, email, fullname, password } = formData;
        const res = await register({email, fullname, password}, avatar);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="fullname" className="form-label">Full Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="fullname" 
                                name="fullname" 
                                value={formData.fullname}
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="avatar" className="form-label">Avatar</label>
                            <input 
                                type="file" 
                                className="form-control" 
                                id="avatar" 
                                name="avatar"
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
