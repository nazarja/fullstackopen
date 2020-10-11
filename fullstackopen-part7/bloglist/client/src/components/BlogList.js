import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Heading from './Heading';
import { Table, Button } from 'react-bootstrap';

const BlogList = props => {
	return (
		<>
			
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>
							<Heading text="All Blogs" type="h4" />
							<Link style={{ float: 'right'}} to="/create"><Button id="create-blog" variant="primary">Create New</Button></Link>
						</th>
					</tr>
				</thead>
				<tbody>
					{
						props.blogs.map(blog =>
							<tr key={blog.id}>
								<td>
									<Link className="bloglist" to={`/blogs/${blog.id}`}>
										<p>{ blog.title}</p>
									</Link>
								</td>
							</tr>
						)
					}
				</tbody>
			</Table>
		</>
	);
};

const mapStateToProps = state => {
	return {
		blogs: state.blogs,
		user: state.user,
	};
};

export default connect(mapStateToProps, null)(BlogList);


