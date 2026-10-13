import { Link, useParams } from 'react-router';
import { Anchor, Container, Loader, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Head } from '@unhead/react';

import Api from 'src/Api';

function AdminPersonDetail () {
  const { id } = useParams();

  const { data: person, isLoading, isError } = useQuery({
    queryKey: ['people', id],
    queryFn: async () => {
      const response = await Api.people.get(id);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Text>Unable to load person.</Text>
        <Anchor component={Link} to='/admin/people'>Back to People</Anchor>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Person Detail</title>
      </Head>
      <Container>
        <Anchor component={Link} to='/admin/people'>Back to People</Anchor>
        <Title mb='md'>{person.name || [person.firstName, person.lastName].filter(Boolean).join(' ') || 'Unnamed Person'}</Title>
        <Text>Email: {person.email || 'Not provided'}</Text>
        <Text>Phone: {person.phone || 'Not provided'}</Text>
      </Container>
    </>
  );
}

export default AdminPersonDetail;
