import { Link, useParams } from 'react-router';
import { Anchor, Container, Loader, Table, Text, Title } from '@mantine/core';
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

        <Title order={2} mt='lg' mb='sm'>Assigned Plots</Title>

        <Table.ScrollContainer>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Address</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {person.assignedPlots.length === 0 &&
                <Table.Tr>
                  <Table.Td colSpan={3}>
                    No assigned plots.
                  </Table.Td>
                </Table.Tr>}
              {person.assignedPlots.map((plot) => (
                <Table.Tr key={plot.id}>
                  <Table.Td>{plot.name || 'Unnamed Plot'}</Table.Td>
                  <Table.Td>{plot.streetAddress || 'Not provided'}</Table.Td>
                  <Table.Td>{plot.status || 'Not provided'}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Container>
    </>
  );
}

export default AdminPersonDetail;
