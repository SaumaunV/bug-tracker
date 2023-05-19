import { useQuery } from '@apollo/client';
import { Badge, Td, Tr, useDisclosure} from '@chakra-ui/react';
import { GET_PROJECT } from '../../graphql/queries';
import { Ticket } from '../../src/__generated__/graphql';
import TicketCardModal from './TicketCardModal';
import { useUser } from '../../UserProvider';

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
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const project = useQuery(GET_PROJECT, {variables: {id: ticket.project_id}});
  const date = new Date(ticket.created_at);

  return (
    <>
      <Tr onClick={onOpen} cursor='pointer'>
        <Td>{ticket.name}</Td>
        <Td>{project.data?.project.name}</Td>
        <Td>{user?.username || "Unassigned"}</Td>
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
      </Tr>
      <TicketCardModal
        ticket={ticket}
        users={project.data?.project.users}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default Ticket