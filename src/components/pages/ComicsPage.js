import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";


const ComicsPage = () => {
    return(
       <>
       <ErrorBoundary>
          <AppBanner/>
        </ErrorBoundary> 
        <ComicsList/>
       </>
    )
}

export default ComicsPage;