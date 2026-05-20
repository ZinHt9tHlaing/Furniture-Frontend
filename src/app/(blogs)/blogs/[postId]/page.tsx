const BlogDetail = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;
  console.log("postId", postId);

  return <div>BlogDetail - {postId}</div>;
};

export default BlogDetail;
