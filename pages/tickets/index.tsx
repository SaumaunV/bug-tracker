import { useLazyQuery } from "@apollo/client";
import React, {useEffect} from "react";
import TicketList from "../../components/Tickets/TicketList";
import { GET_USER_TICKETS } from "../../graphql/queries";
import { useUser } from "../../UserProvider";
import { Skeleton } from "@chakra-ui/react";


function Tickets() {
  const {user} = useUser();
  const [getUserTickets, {data, loading, error}] = useLazyQuery(GET_USER_TICKETS);

  useEffect(() => {
    if(user) {
      getUserTickets({variables: {id: user.id}});
    };
  }, [user])

  if(loading) return <Skeleton m={10} h="150px"></Skeleton>;

  return <TicketList padding={10} tickets={data?.userTickets}/>;
}

export default Tickets;