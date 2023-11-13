import React from 'react';
import Layout from '../components/layout';
import { Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import CreateSessionButton from '../Cards/Components/CreateSessionButton';
import Diversity3 from '@mui/icons-material/Diversity3'
import ThreeP from '@mui/icons-material/ThreeP'
import AccessAlarm from '@mui/icons-material/AccessAlarm'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ItemTitle = styled(Typography)(({theme}) => ({
  ...theme.typography.h5
}))

const IndexPage = () => {

  return (
    <Layout>
      <CreateSessionButton />
      <Stack 
      direction={{xs: 'column', sm: 'row'}}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>
          <Diversity3 sx={{ fontSize: 100 }} />
          <ItemTitle gutterBottom>Collaborative Decision-Making</ItemTitle>
          <p>Planning poker fosters collaboration among team members by encouraging open discussions about the complexity of tasks. It leverages the collective knowledge and experience of the team, ensuring a more comprehensive understanding of the work at hand.</p>
        </Item>
        <Item>
          <ThreeP sx={{ fontSize: 100 }} />
          <ItemTitle gutterBottom>Mitigating Individual Biases</ItemTitle>
          <p>By anonymously assigning story points during planning poker, team members can provide their estimates without being influenced by others. This helps mitigate individual biases and ensures a more objective and accurate estimation process, leading to better project planning and execution.</p>
        </Item>
        <Item>
          <AccessAlarm sx={{ fontSize: 100 }} />
          <ItemTitle gutterBottom>Efficient and Engaging</ItemTitle>
          <p>Planning poker is a time-efficient technique that adds an element of gamification to the estimation process. It keeps team members engaged and motivated, making the planning sessions more dynamic and enjoyable. This can contribute to a positive team culture and improved overall productivity.</p>
        </Item>
      </Stack>
    </Layout>
  );
};

export default IndexPage;
