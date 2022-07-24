import React, { useState } from "react";
import classes from "./CampaignForm.module.css";
import Axios from "axios";
import Modal from "./Modal";

const CampaignForm = () => {
    //Collecting data
    const [name, setName] = useState("");
    const [keywords, setKeywords] = useState("");
    const [amount, setAmount] = useState(0);
    const [funds, setFunds] = useState(0);
    const [status, setStatus] = useState("");
    const [town, setTown] = useState("");
    const [radius, setRadius] = useState(0);

    const newNameHandler = (event) => {
        setName(event.target.value);
    };
    const newKeywordHandler = (event) => {
        setKeywords(event.target.value);
    };
    const newAmountHandler = (event) => {
        setAmount(event.target.value);
    };
    const newFundsHandler = (event) => {
        setFunds(event.target.value);
    };
    const newStatusHandler = (event) => {
        setStatus(event.target.value);
    };
    const newTownHandler = (event) => {
        setTown(event.target.value);
    };
    const newRadiusHandler = (event) => {
        setRadius(event.target.value);
    };

    //Visibility of campaigns
    const [showCampaign, setShowCampaign] = useState(false);
    const [campaignsList, setCampaignsList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const show = () => {
        setShowCampaign(true);

        Axios.get("http://localhost:4000/campaigns").then((response) => {
            setCampaignsList(response.data);
        });
    };
    const hide = () => {
        setShowCampaign(false);
    };

    //Adding new campaign
    const addCampaign = () => {
        Axios.post("http://localhost:4000/create", {
            name,
            keywords,
            amount,
            funds,
            status,
            town,
            radius,
        }).then(() => {
            setCampaignsList([
                ...campaignsList,
                {
                    name,
                    keywords,
                    amount,
                    funds,
                    status,
                    town,
                    radius,
                },
            ]);
        });
    };

    const deleteCampaign = (id) => {
        Axios.delete(`http://localhost:4000/delete/${id}`).then((response) => {
            setCampaignsList(
                campaignsList.filter((value) => {
                    return value.id != id;
                })
            );
        });
    };

    return (
        <div className={classes.main}>
            <div className={classes.form}>
                <label htmlFor="name">Campaign name: </label>
                <input id="name" type="text" onChange={newNameHandler} />
                <label htmlFor="keywords">Keyword: </label>
                <input id="keywords" type="text" onChange={newKeywordHandler} />
                <label htmlFor="amount">Bid amount: </label>
                <input id="amount" type="number" onChange={newAmountHandler} />
                <label htmlFor="funds">Campaign funds: </label>
                <input id="funds" type="number" onChange={newFundsHandler} />
                <label htmlFor="status">Status: </label>
                <select id="status" onChange={newStatusHandler}>
                    <option selected disabled hidden>
                        Choose status
                    </option>
                    <option value="on">On</option>
                    <option value="off">Off</option>
                </select>
                <label htmlFor="town">Town: </label>
                <select id="town" onChange={newTownHandler}>
                    <option selected disabled hidden>
                        Choose town
                    </option>
                    <option value="Warsaw">Warszawa</option>
                    <option value="Krakow">Kraków</option>
                    <option value="Lodz">Łódź</option>
                    <option value="Wroclaw">Wrocław</option>
                    <option value="Poznan">Poznań</option>
                    <option value="Gdansk">Gdańsk</option>
                    <option value="Szczecin">Szczecin</option>
                    <option value="Bydgoszcz">Bydgoszcz</option>
                    <option value="Lublin">Lublin</option>
                    <option value="Katowice">Katowice</option>
                </select>
                <label htmlFor="radius">Radius [km]: </label>
                <input id="radius" type="number" onChange={newRadiusHandler} />
                <button className={classes.button} onClick={addCampaign}>
                    Add new campaign
                </button>
            </div>
            <div className={classes.section}>
                {!showCampaign && (
                    <button className={classes.button} onClick={show}>
                        Show campaigns
                    </button>
                )}
                {showCampaign && (
                    <>
                        <button className={classes.button} onClick={hide}>
                            Hide campaigns
                        </button>
                        <h1>Campaigns: </h1>
                        {campaignsList.map((value, key) => {
                            return (
                                <div className={classes.campaignList}>
                                    <p>
                                        Campaign name: <span>{value.name}</span>
                                    </p>
                                    <p>
                                        Keywords: <span>{value.keywords}</span>
                                    </p>
                                    <p>
                                        Bid amount: <span>{value.amount}</span>
                                    </p>
                                    <p>
                                        Campaign funds:{" "}
                                        <span>{value.funds}</span>
                                    </p>
                                    <p>
                                        Status: <span>{value.status}</span>
                                    </p>
                                    <p>
                                        Town: <span>{value.town}</span>
                                    </p>
                                    <p>
                                        Radius [km]: <span>{value.radius}</span>
                                    </p>
                                    <div className={classes.specButtons}>
                                        {/*<button onClick={() => setIsOpen(true)}>
                                            Update
                                        </button>*/}
                                        <button
                                            onClick={() => {
                                                deleteCampaign(value.id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

export default CampaignForm;
