export default class FrontendUtils {
    static serializeClasses = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }
}
