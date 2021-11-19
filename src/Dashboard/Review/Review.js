import { Rating, TextField, Typography, Button, Alert } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import useAuth from "../../Hooks/useAuth";


const Review = () => {

    const [value, setValue] = React.useState(0);
    const [comment, setComment] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const { user } = useAuth();




    const handleComment = (e) => {
        e.preventDefault();
        console.log(comment, value);
        const review = {
            name: user.displayName,
            comment: comment,
            rating: value,
        };
        fetch("https://polar-savannah-62685.herokuapp.com/user/review", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(review),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setComment("");
                setValue(0);
                setSuccess(true);
            });
    };


    return (
        <div>
            <Container style={{ textAlign: "center", marginTop: 100 }}>
                <h1>Give your Comment</h1>
                <TextField
                    id="outlined-multiline-static"
                    label="Your Comment "
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    multiline
                    rows={4}
                    style={{ width: "50%" }}
                />{" "}
                <br />
                <Typography component="legend">Your Rating</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    precision={0.5}
                />
                <br />
                <Button
                    onClick={handleComment}
                    variant="contained"
                    style={{ width: "40%" }}
                >
                    Submit
                </Button>
                {success && (
                    <Alert severity="success">
                        Your Comment Successfully Submitted.....
                    </Alert>
                )}
            </Container>
        </div>
    );
};

export default Review;