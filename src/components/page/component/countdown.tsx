'use client';
import { Box, Flex, Spacer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Component as ComponentModel } from 'showed/lib/page/models/component';
import TimePartBlock from './coutdown/timePartBlock';

interface CountdownDate {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export default function Countdown({
    component,
}: {
    component: ComponentModel;
}) {
    const calculateTimeLeft = (endDate: string): CountdownDate => {
        let difference = +new Date(endDate) - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor(difference / 1000) % 60,
            };
        }

        return timeLeft;
    };
    const [timeLeft, setTimeLeft] = useState<CountdownDate>(
        calculateTimeLeft(component.content)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft(component.content));
        }, 1000);

        return () => clearInterval(interval);
    }, [component]);
    return (
        <Flex>
            <Spacer />
            <TimePartBlock value={timeLeft.days} label='Jours' />
            <Box width={'5px'} />
            <TimePartBlock value={timeLeft.hours} label='Heures' />
            <Box width={'5px'} />
            <TimePartBlock value={timeLeft.minutes} label='Minutes' />
            <Box width={'5px'} />
            <TimePartBlock value={timeLeft.seconds} label='Secondes' />
            <Spacer />
        </Flex>
    );
}
