import React, { useState, useEffect } from "react";
import '../styles/Front.scss';
import '../App.scss';
import Axios from "axios";
import Select, { createFilter } from 'react-select'



export default function Career() {
    const data = [
        {
            value: 'Java',
            label: "Java"
        },
        {
            value: 'JavaScript',
            label: "JavaScript"
        },
        {
            value: 'HTML',
            label: "HTML"
        },
    ];

    // set value for default selection
    const [selectedValue, setSelectedValue] = useState('JavaScript');
    const [repos, setRepos] = useState([]);
    // const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        getXs();
    }, []);

    const getXs = async () => {
        await Axios.get("https://api.github.com/users/OlSavMe/repos?per_page=100").then(
            response => {
                setRepos(response.data);
                // setFiltered(repos.filter(repo => repo.language === `${selectedValue}`));

            }
        );
    };

    // const filtered = async () => {
    //     repos.filter(
    //         repo => repo.language === 'JavaScript');

    // };




    // console.log(filtered);
    console.log(`${selectedValue}`);
    const filtered = repos.filter(repo => repo.language === `${selectedValue}`);
    console.log(filtered);



    // handle onChange event of the dropdown
    const handleChange = e => {
        setSelectedValue(e.value);
    }



    return (
        <div className="App">

            <Select
                placeholder="Select Option"
                value={data.filter(obj => obj.value === selectedValue)} // set selected value
                options={data} // set list of the data
                onChange={handleChange} // assign onChange function
            />

            <ol>
                {repos.map((repo) =>
                    <li key={repo.id}>
                        <a href={repo.html_url} target="_blank"> {repo.name}</a>
                        <p>{repo.description}</p>
                    </li>
                )
                }
            </ol>

        </div >
    );
}


