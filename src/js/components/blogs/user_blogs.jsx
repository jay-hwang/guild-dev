import React from 'react';
import { connect } from 'react-redux';

import {
    requestUserBlogs
} from '../../actions/blog_actions';

import BlogLink from './blog_link';

class UserBlogs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userBlogs: {}
        };

        this.mapBlogLink = this.mapBlogLinks.bind(this);
    }

    componentDidMount() {
        this.props.requestUserBlogs(this.props.currentUser);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ userBlog: nextProps.userBlogs });
    }

    mapBlogLinks() {
        return Object.keys(this.state.userBlogs).map((blogId, index) => (
            <BlogLink key={index} blog={ this.state.blogs[blogId] }/>
        ));
    }

    render() {
        return (
            <section id='user-blogs'>
                { this.mapBlogLinks() }
            </section>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
    userBlogs: state.blogs.userBlogs
});

const mapDispatchToProps = dispatch => ({
    requestUserBlogs: user => dispatch(requestUserBlogs(user))
});

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(UserBlogs);
