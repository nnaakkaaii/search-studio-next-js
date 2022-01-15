import {styled} from "@mui/system";
import {Chip} from "@mui/material";

const MyChip = styled(Chip)({
    textTransform: 'none',
    color: '#5A4628',
    backgroundColor: '#e7e1d8',
    margin: '1px 2px',
    '& .MuiChip-deleteIcon': {
        color: '#9B8C7D'
    }
})

interface SearchChipProps {
    label: any|null,
    pre?: string,
    after?: string|null,
    onDelete?: (value: any) => void;
}

export default function SearchChip(props: SearchChipProps) {
    const {label, pre, after, onDelete} = props;

    return (
        label ?
            <MyChip size='small' onDelete={onDelete} label={`${pre ? pre : ''}${label}${after ? after : ''}`}/>
            : null
    );
}