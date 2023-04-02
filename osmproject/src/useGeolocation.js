import React, { useEffect, useState } from "react";

const useGeolocation=()=>{
    const [location, setLocation]= useState({
        loaded: false,
        coordinates: {lat: "", lon: ""}
    });

    const onSucces=(location)=>{
        // console.log(location);
        setLocation({
            loaded:true,
            coordinates: {
                lat: location.coords.latitude,
                lon: location.coords.longitude,
            },
        });
    };
    const onError=(error)=>{
        setLocation({
            loaded: true,
            error,
        });
    };

    useEffect(()=>{
        if(!("geolocation" in navigator)){
            onError({
                code: 0, 
                message: "error throen"
            })
        }
        navigator.geolocation.getCurrentPosition(onSucces, onError);
    }, []);
    return location
}

export default useGeolocation;