import AppLayout from '../../components/templates/AppLayout';

export default function SignUp() {
  return (
    <div>
      <AppLayout
        mode={'dev'}
        title="SignIn"
        description=""
        showLeftSidebar={false}
        showRightSidebar={false}
        showHeader={false}
        showFooter={true}
      >
        <div>sign-up</div>
      </AppLayout>
    </div>
  );
}
