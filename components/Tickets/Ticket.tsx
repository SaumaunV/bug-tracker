import { useQuery } from '@apollo/client';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Badge, IconButton, Td, Tr, useColorMode, useDisclosure} from '@chakra-ui/react';
import { GET_PROJECT, GET_USER_NAME } from '../../graphql/queries';
import { Ticket } from '../../src/__generated__/graphql';
import AlertDialogDelete from '../AlertDialogDelete';
import TicketInfoModal from './TicketInfoModal';
import TicketModal from './TicketModal';

interface Props {
  ticket: Ticket;
}

interface colorType {
  [key: string]: string;
}
const BadgeColors: colorType = {
  immediate: "blue",
  resolved: "blue",
  high: "red",
  medium: "orange",
  testing: "orange",
  low: "green",
  new: "green",
  development: "yellow",
  unassigned: "grey"
}

function Ticket({ ticket }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEditTicket, onOpen: onOpenEditTicket, onClose: onCloseEditTicket } = useDisclosure({id: "ticket-modal"});
  const {
    isOpen: isOpenViewTicket,
    onOpen: onOpenViewTicket,
    onClose: onCloseViewTicket,
  } = useDisclosure();
  const project = useQuery(GET_PROJECT, {variables: {id: ticket.project_id}});
  const user = useQuery(GET_USER_NAME, {variables: {id: ticket.user_id!}});
  const {colorMode} = useColorMode();
  const date = new Date(ticket.created_at);

  return (
    <>
      <Tr>
        <Td>{ticket.name}</Td>
        <Td>{project.data?.project.name}</Td>
        <Td>{user.data?.user?.username || "Unassigned"}</Td>
        <Td>
          <Badge
            variant="outline"
            colorScheme={BadgeColors[ticket.status]}
            px={2}
          >
            {ticket.status}
          </Badge>
        </Td>
        <Td>
          <Badge
            variant="outline"
            colorScheme={BadgeColors[ticket.priority]}
            px={2}
          >
            {ticket.priority}
          </Badge>
        </Td>
        <Td>{date.toLocaleDateString()}</Td>
        <Td>
          <IconButton
            aria-label="View Ticket"
            icon={<ViewIcon />}
            colorScheme={colorMode === "dark" ? "facebook" : "gray"}
            onClick={onOpenViewTicket}
          />
          <IconButton
            aria-label="Edit Ticket"
            icon={<EditIcon />}
            colorScheme={colorMode === "dark" ? "facebook" : "gray"}
            onClick={onOpenEditTicket}
            ml={2}
          />
          <IconButton
            aria-label="Delete Ticket"
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={onOpen}
            ml={10}
          />
        </Td>
      </Tr>
      <AlertDialogDelete
        id={ticket.id}
        isOpen={isOpen}
        onClose={onClose}
        type="ticket"
        title="Delete Ticket"
        projectId={ticket.project_id}
      />
      <TicketModal
        ticket={ticket}
        isOpen={isOpenEditTicket}
        onClose={onCloseEditTicket}
        title="Edit Ticket"
        buttonText="Save"
        userId={ticket.user_id!}
        update
      />
      <TicketInfoModal
        ticket={ticket}
        isOpen={isOpenViewTicket}
        onClose={onCloseViewTicket}
      />
    </>
  );
}

export default Ticket