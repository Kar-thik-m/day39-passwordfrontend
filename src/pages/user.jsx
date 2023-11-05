import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../config";


const UserDialog = ({ handleDialog, fetchUser }) => {

    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        dob: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await fetch(
            `${backendUrl}/users`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        );
        await fetchUser();
        handleDialog();
    };

    return (
        <div className="dialog-root">
            <form onSubmit={handleSubmit}>
                <h2>Simple React Form</h2>

                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
function People() {
    const [showDialog, setShowDialog] = useState(false);

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleDialog = () => {
        if (showDialog) {
            setShowDialog(false);
        } else {
            setShowDialog(true);
        }
    }

    const fetchUser = async () => {
        const responce = await fetch(`${backendUrl}/users`);
        const data = await responce.json();
        setUsers(data);
    }
    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    fontSize: 32
                }}
            >
                <div
                    style={{
                        flexGrow: 1,
                    }}
                >
                    List of users in the app
                </div>
                <button onClick={handleDialog}>
                    Add user
                </button>
                
                
        <button
          onClick={() => {
            localStorage.removeItem('user');
            navigate('login');
          }}
          style={{
            marginLeft: 8,
          }}
        >
          Logout
        </button>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>

                {users
                    .map((user) => (
                        <div
                            key={user.id}>
                            <div
                                style={{
                                    border: '1px solid',
                                    margin: 4,
                                    padding: 4
                                }}
                            >
                                <img src={user.imageUrl} alt={user.name} />
                                <h3>{user.name}</h3>
                                <h4>{user.dob}</h4>
                            </div>
                        </div>
                    ))}

            </div>
            {showDialog && <UserDialog handleDialog={handleDialog} fetchUser={fetchUser} />}

        </>
    )
}

export default People;