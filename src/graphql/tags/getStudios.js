import gql from 'graphql-tag';

export const GET_STUDIOS = gql`
  query getStudios($studio_name: String, $prefecture_ids: [String], $city_ids: [String], $line_ids: [String], $station_ids: [String], $min_floor_area: Int, $max_floor_area: Int, $min_reserve_people: Int, $max_reserve_people: Int, $minutes_from_station: Int, ) {
  getStudios(studio_name: $studio_name, prefecture_ids: $prefecture_ids, city_ids: $city_ids, line_ids: $line_ids, station_ids: $station_ids) {
    studio_id
    studio_name
    rent_by_min_hours
    studio_images {
      image_name
      image_path
    }
    studio_station_railway_exits {
      station_name
      exit_name
      minutes_from_station
    }
    getRooms {
      room_name
      min_reservable_people
      max_reservable_people
      floor_area
      getRoomSlots(dates: ["2022-01-20"], time_begin: "12:00:00", time_end: "16:00:00") {
        room_slot_id
        date
        time_begin
        time_end
        workload
        slot_price
        remain_slot_count
      }
      room_images {
        image_name
        image_path
      }
    }
  }
}
`;