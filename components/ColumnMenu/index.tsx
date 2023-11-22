import React, {useCallback} from 'react'
import {Button, Divider, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@mui/material';
import {Delete, MoreVert} from "@node_modules/@mui/icons-material";
import Check from '@mui/icons-material/Check';
import {Column, ColumnType, DeleteColumnDocument, Scalars} from "@graphql/types";
import {useMutation} from "@node_modules/@apollo/client";

type Props = {
    className: string,
    columnType: Column["type"]
    columnUuid: Scalars["UUID"]["output"]
}

function ColumnMenu({className, columnType, columnUuid}: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [deleteColumn] = useMutation(DeleteColumnDocument);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = useCallback(() => {
        console.log("Deleting", columnUuid);
        void deleteColumn({variables: {uuid: columnUuid}});
        handleClose();
    },
        [columnUuid]);

    return (
        <div className={className}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVert  />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuList>
                    <ListItem>Column type:</ListItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            {columnType == ColumnType.Todo &&
                                <Check />
                            }
                        </ListItemIcon>
                        <ListItemText>To do</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            {columnType == ColumnType.InProgress &&
                                <Check />
                            }
                        </ListItemIcon>
                        <ListItemText>In progress</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            {columnType == ColumnType.Done &&
                                <Check />
                            }
                        </ListItemIcon>
                        <ListItemText>Done</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            {columnType == null &&
                                <Check />
                            }
                        </ListItemIcon>
                        <ListItemText>Other</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleDelete}>
                        <ListItemIcon>
                            <Delete fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    )
}

export default ColumnMenu