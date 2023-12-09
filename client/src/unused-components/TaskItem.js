
import { Grid, GridItem } from '@chakra-ui/react';


function TaskItem({task}) {
    const {project, start_date, end_date, status, name, description, comments} = task;

    const project_name = project.name;

    // const commentList = comments.map(c => {
        // return c.comment
    // })

    // const hasComments = (comments.length>0) ? true : false;

    return (
        <Grid
            templateAreas={`"prjct  prjct  prjct  .... start end status"
                            "name   name   name   name name  name name"
                            "head1  ....   ....   .... .... .... ...."
                            "descr   descr descr descr descr descr descr"
                            "head2  ....   ....   .... .... .... ...."
                            "cmts   cmts   cmts   cmts cmts  cmts cmts"`}
            gap='1'
            color='blackAlpha.700'
        >
            <GridItem area={'prjct'}>{project_name}</GridItem>
            <GridItem area={'start'}>{start_date}</GridItem>
            <GridItem area={'end'}>{end_date}</GridItem>
            <GridItem area={'status'}>{status}</GridItem>
            <GridItem area={'name'}>{name}</GridItem>
            <GridItem area={'head1'} >Description</GridItem>
            <GridItem area={'descr'}>{description}</GridItem>
            {comments && <GridItem area={'head2'} >Comments</GridItem>}
            {comments && <GridItem area={'cmts'} >{comments}</GridItem>}
            {/* {hasComments && <GridItem area={'head2'} >Comments</GridItem>} */}
            {/* {hasComments && <GridItem area={'cmts'}>{commentList}</GridItem>} */}
        </Grid>
    )
}

export default TaskItem