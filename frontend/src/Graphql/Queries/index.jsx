
import { gql} from '@apollo/client';

export const COURSES = gql`
    {
        courses {
            courseId
            courseType
            courseStatus
            courseName
            file
          }
    }
`
export const UNREADED_ANSWERS = gql`
    query ($readerId:Int){
        readerUnread(readerId:$readerId)
    }
`
export const LIBRARIES = gql`
   query{
        lib{
        libraryId
        libraryName
        }
    }
`
export const THEMES = gql`
   query{
        themes{
            themeId
            themeName
        }
    }
`
export const READER_ROOMS = gql`
  query($readerId:Int){
        readerRooms(readerId:$readerId)
    }
`