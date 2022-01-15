import {useRouter} from 'next/router';
import {prefItem} from "./itemsAndOptions/prefItems";
import {lineItem} from "./itemsAndOptions/lineItems";
import {useState} from "react";

function unixToDate(props: {unix: string[], match: boolean}) {
    const start = new Date(Number(props.unix[0]) * 1000);
    const end = new Date(Number(props.unix[1]) * 1000);

    const startTime: string|null =
        !props.match && start.getHours() - 9 === 0 && start.getMinutes() === 0 ?
            null : `${start.getHours() - 9}:${('0' + start.getMinutes()).slice(-2)}`;

    const endTime: string|null =
        props.match ?
            end.getMinutes() === 59 ? '24:00' : `${end.getHours() - 9}:${('0' + end.getMinutes()).slice(-2)}`
            :
            end.getMinutes() === 59 ? null : `${end.getHours() - 9}:${('0' + end.getMinutes()).slice(-2)}`;

    return (
        {date: start, startTime: startTime, endTime: endTime, matchTime: props.match}
    )
}

function getAsArray(value:string|string[]|undefined):string[] {
    if(Array.isArray(value)){
        return value[0].split(',');
    } else if(value !== undefined){
    return value.split(',')
    } else {
        return []
    }
}

function getAsString(value:string|string[]|undefined):string {
    if(Array.isArray(value)){
        return value[0];
    } else if(value !== undefined){
        return value
    } else {
        return ''
    }
}

function getAsNumber(value:string|string[]|undefined):number|null {
    if(Array.isArray(value)){
        return Number(value[0]);
    } else if(value !== undefined){
        return Number(value)
    } else {
        return null
    }
}

export const FromQuery = () => {
    const query = useRouter().query;

    const prefectureQuery: string[] = getAsArray(query.prefecture_name);
    const cityQuery: string[] = getAsArray(query.city_name);
    const lineQuery: string[] = getAsArray(query.line_name);
    const stationQuery: string[] = getAsArray(query.station_name);
    const studioName: string = getAsString(query.studio_name);
    const areaMin: number|null = getAsNumber(query.area_min);
    const areaMax: number|null = getAsNumber(query.area_max);
    const peopleMin: number|null = getAsNumber(query.people_min);
    const peopleMax: number|null = getAsNumber(query.people_max);
    const dateQuery: string = getAsString(query.date);
    const fromStation: number|null = getAsNumber(query.from_station_max);
    const priceMin: number|null = getAsNumber(query.price_min);
    const priceMax: number|null = getAsNumber(query.price_max);
    const freeCancel: boolean = query.free_cancel === 'true';
    const halfHourSlot: boolean = query.half_hour_slot === 'true';
    const fromHalfHour: boolean = query.from_half_hour === 'true';
    const reservation: string[] = getAsArray(query.reservation);
    const studioFacility: string[] = getAsArray(query.studio_facility);
    const mirrorMin: number|null = getAsNumber(query.mirror_min);
    const mirrorMax: number|null = getAsNumber(query.mirror_max);
    const floorMaterial: string[] = getAsArray(query.floor_material);
    const roomFacility: string[] = getAsArray(query.room_facility);


    const prefecture: {name: string, id: string}[] = [];
    const city: {name: string, id: string}[] = [];
    const line: {name: string, id: string}[] = [];
    const station: {name: string, id: string}[] = [];
    const date: {date: Date, startTime: string|null, endTime: string|null, matchTime: boolean}[] = [];
    const dateMatch: boolean = dateQuery.includes(' ');

    prefItem.map((item) =>
        prefectureQuery && prefectureQuery.map((id) => id === item.pref.id).includes(true) ?
            prefecture.push(item.pref)
            :
            item.cities.map((c) =>
                cityQuery && cityQuery.map((id) => id === c.id).includes(true) && city.push(c)
            )
    );

    lineItem.map((item) =>
        lineQuery && lineQuery.map((id) => id === item.line.id).includes(true) ?
            line.push(item.line)
            :
            item.stations.map((s) =>
                    stationQuery && stationQuery.map((id) => id === s.id).includes(true) &&
                    !station.map((item) => item.id).includes(s.id) && station.push(s)
                )

    );

    dateQuery !== '' && dateQuery.split(/,|\s/).map((item) =>
        date.push(unixToDate({unix: item.split(/and|or/), match: item.includes('and')}))
    );

    return (
        {
            prefecture: prefecture, city: city, line: line, station: station, studioName: studioName,
            areaMin: areaMin, areaMax: areaMax, peopleMin: peopleMin, peopleMax: peopleMax,
            date: date, dateMatch: dateMatch, fromStation: fromStation, priceMin: priceMin, priceMax: priceMax,
            freeCancel: freeCancel, halfHourSlot: halfHourSlot, fromHalfHour: fromHalfHour,
            reservation: reservation, studioFacility: studioFacility,
            mirrorMin: mirrorMin, mirrorMax: mirrorMax, floorMaterial: floorMaterial, roomFacility: roomFacility
        }
    );
}