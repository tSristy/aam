'use client';

import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const getFirstFridayOfNextMonth = () => {
    const today = new Date();
    const firstOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const dayOfWeek = firstOfNextMonth.getDay();
    const daysToAdd = (5 - dayOfWeek + 7) % 7;
    firstOfNextMonth.setDate(1 + daysToAdd);
    return firstOfNextMonth;
}

const UpComingFriday = ({ variantStyle }) => {
    const [firstFriday, setFirstFriday] = useState(null);

    useEffect(() => {
        const date = getFirstFridayOfNextMonth();
        setFirstFriday(date);
    }, []);

    if (!firstFriday) {
        return <div>Calculating...</div>;
    }
    return (
        <Typography variant={variantStyle}>{firstFriday.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric'  
      })}</Typography>

    );
}

export default UpComingFriday;