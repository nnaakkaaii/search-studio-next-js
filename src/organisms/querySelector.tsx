import {selector} from "recoil";
import {
    areaChipState, cityChipState, detailItemChipState, floorMaterialChipState,
    fromStationChipState, lineChipState, mirrorChipState, peopleChipState, prefectureChipState, priceChipState,
    reservationChipState, roomFacilityChipState, stationChipState, studioFacilityChipState, studioNameState
} from "../atom";
import {reserveOptions} from "../itemsAndOptions/detailOptions";

export const queryState = selector({
    key: 'queryState',
    get: ({get}) => {
        const prefecture = get(prefectureChipState);
        const city = get(cityChipState);
        const line = get(lineChipState);
        const station = get(stationChipState);
        const studioName = get(studioNameState);
        const area = get(areaChipState);
        const people = get(peopleChipState);
        const fromStation = get(fromStationChipState);
        const price = get(priceChipState);
        const mirror = get(mirrorChipState);
        const detailItem = get(detailItemChipState);
        const reservation = get(reservationChipState);
        const studioF = get(studioFacilityChipState);
        const roomF = get(roomFacilityChipState);
        const floor = get(floorMaterialChipState);
        const roomFacility :string[] = [...roomF];

        const query = [];

        detailItem.includes('鏡2面') && roomFacility.unshift('鏡2面');

        prefecture.length > 0 && query.push(`prefecture_name=${prefecture.map((item) => item.id)}`)
        city.length > 0 && query.push(`city_name=${city.map((item) => item.id)}`)
        line.length > 0 && query.push(`line_name=${line.map((item) => item.id)}`)
        station.length > 0 && query.push(`station_name=${station.map((item) => item.id)}`)
        studioName && query.push(`studio_name=${studioName}`)
        area.min && query.push(`area_min=${area.min}`)
        area.max && query.push(`area_max=${area.max}`)
        people.min && query.push(`people_min=${people.min}`)
        people.max && query.push(`people_max=${people.max}`)
        fromStation && query.push(`from_station_max=${fromStation}`)
        detailItem.includes('キャンセル無料期間あり') && query.push(`free_cancel=true`)
        price.min && query.push(`price_min=${price.min}`)
        price.max && query.push(`price_max=${price.max}`)
        detailItem.includes(reserveOptions[0]) && query.push(`half_hour_slot=true`)
        detailItem.includes(reserveOptions[1]) && query.push(`from_half_hour=true`)
        reservation.length > 0 && query.push(`reservation=${reservation.map((item) => item)}`)
        studioF.length > 0 && query.push(`studio_facility=${studioF.map((item) => item)}`)
        mirror.min && query.push(`mirror_min=${mirror.min}`)
        mirror.max && query.push(`mirror_max=${mirror.max}`)
        roomFacility.length > 0 && query.push(`room_facility=${roomFacility.map((item) => item)}`)
        floor.length > 0 && query.push(`floor_material=${floor.map((item) => item)}`)

        return query;
    },
});