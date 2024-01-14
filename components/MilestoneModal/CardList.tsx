import Accordion from "@node_modules/@mui/material/Accordion";
import AccordionSummary from "@node_modules/@mui/material/AccordionSummary";
import ExpandMoreIcon from "@node_modules/@mui/icons-material/ExpandMore";
import {Typography} from "@node_modules/@mui/material";
import AccordionDetails from "@node_modules/@mui/material/AccordionDetails";
import React from "react";
import {MilestoneQuery} from "@graphql/types";
import MilestoneCard from "@components/MilestoneModal/MilestoneCard";

type Props = {
    title: string,
    cards: NonNullable<MilestoneQuery['milestone']>['cards']
}

export default function CardList(props: Props) {
    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography>{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {props.cards
                    .map(card =>
                        <MilestoneCard {...card} key={card.uuid} />
                    )
                }
            </AccordionDetails>
        </Accordion>
    )
}